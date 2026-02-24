import getUser from '@/lib/dal/user';
import { NextRequest, NextResponse } from 'next/server';

export async function proxy(request: NextRequest) {
    const session = await getUser();

    if (!session) {
        const res = NextResponse.redirect(new URL('/log-in', request.url));
        res.cookies.delete('accessToken');
        res.cookies.delete('userId');
        return res;
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/(authenticated)/**'], // Specify the routes the middleware applies to
};
