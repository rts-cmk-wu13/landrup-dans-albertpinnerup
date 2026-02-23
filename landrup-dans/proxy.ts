import { checkAuthentication } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function proxy(request: NextRequest) {
    const session = await checkAuthentication();

    if (!session) {
        return NextResponse.redirect(new URL('/login', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/(authenticated)/**'], // Specify the routes the middleware applies to
};
