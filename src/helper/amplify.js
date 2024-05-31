import { Amplify } from "aws-amplify";
// import { cognitoUserPoolsTokenProvider } from "aws-amplify/auth/cognito";
// import { sessionStorage } from "aws-amplify/utils";
// import { defineAuth } from "aws-amplify/";

export const ConfigureAmplify = () => {
    Amplify.configure({
        Auth: {
            Cognito: {
                region: process.env.REACT_APP_AWS_COGNITO_REGION,
                userPoolId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_ID,
                userPoolClientId: process.env.REACT_APP_AWS_COGNITO_USER_POOL_CLIENT_ID,
                mfa: {
                    status: "on",
                    totpEnabled: true,
                },
            },
        },
    });
    // cognitoUserPoolsTokenProvider.setKeyValueStorage(sessionStorage);

    // const auth = defineAuth({
    //     loginWith: {
    //         email: true,
    //     },
    //     multifactor: {
    //         mode: "optional",
    //         totp: true,
    //     },
    // });
    // auth();
};

// export const GetCurrentUser = () => {
//   return Auth.currentAuthenticatedUser();
// }
