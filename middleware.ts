import { withAuth } from "next-auth/middleware";

export default withAuth({
    pages:{
        signIn:'/'
    }
});

export const config ={
    matcher:[
        '/Admin/:path*',
        '/User/:path*',
        '/api/createProject',
    ]
}