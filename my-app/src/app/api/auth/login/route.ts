import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '../../../../lib/db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const { data: user, error } = await supabase
      .from('users')
      .select('id, name, email, password')
      .eq('email', email)
      .single();

    if (error || !user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    
    }

    const token = jwt.sign(
      { id: user.id, email: user.email, name: user.name },
      process.env.SECRET_KEY!,
      { expiresIn: '1h' }
    );

    return NextResponse.json({ token, user: { id: user.id, name: user.name, email: user.email } }, { status: 200 });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}