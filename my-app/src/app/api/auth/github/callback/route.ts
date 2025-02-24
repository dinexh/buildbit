import { MongoClient, ObjectId } from 'mongodb';
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';
import jwt from 'jsonwebtoken';

const client = new MongoClient(process.env.MONGODB_URI as string);

interface GitHubUser {
  login: string;
  email: string | null;
  id: number;
}

interface User {
  _id: ObjectId;
  githubId: number;
  username: string;
  email: string;
  accessToken: string;
  createdAt: Date;
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  try {
    const tokenResponse = await axios.post(
      'https://github.com/login/oauth/access_token',
      {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
        redirect_uri: `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}/api/auth/github/callback`,
      },
      { headers: { Accept: 'application/json' } }
    );

    const accessToken: string = tokenResponse.data.access_token;
    if (!accessToken) throw new Error('Failed to get access token');

    const userResponse = await axios.get<GitHubUser>('https://api.github.com/user', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    const { login, email, id: githubId } = userResponse.data;

    await client.connect();
    const db = client.db('bitbuild'); // Replace with your DB name
    const usersCollection = db.collection<User>('users');

    let user = await usersCollection.findOne({ githubId });
    if (!user) {
      const newUser: Omit<User, '_id'> = {
        githubId,
        username: login,
        email: email || `${login}@github.com`,
        accessToken,
        createdAt: new Date(),
      };
      const result = await usersCollection.insertOne(newUser as User);
      user = {
        ...newUser,
        _id: result.insertedId
      };
    } else {
      await usersCollection.updateOne({ githubId }, { $set: { accessToken } });
    }

    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined');
    }
    const token = jwt.sign(
      { id: user._id, githubId }, 
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return NextResponse.redirect(new URL(`/dashboard?token=${token}`, req.url));
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Authentication failed' }, { status: 500 });
  } finally {
    await client.close();
  }
}