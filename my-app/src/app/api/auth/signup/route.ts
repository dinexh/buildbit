import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../lib/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    const { name, email, password } = await req.json();

    // Validate input
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
      console.log("All fields are required");
    }

    // Check if user exists
    const { data: existingUser } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .single();

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 409 });
      console.log("User already exists");
    }

    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Insert user into Supabase
    const { data, error } = await supabase
      .from('users')
      .insert([{ name, email, password: hashedPassword }])
      .select('id, name, email')
      .single();

    if (error) throw error;
    console.log("User inserted successfully");
    // Generate JWT
    const token = jwt.sign(
      { id: data.id, email: data.email, name: data.name },
      process.env.SECRET_KEY!,
      { expiresIn: '1h' }
    );

    return NextResponse.json({ token, user: { id: data.id, name, email } }, { status: 201 });
  } catch (error) {
    console.error('Signup error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}