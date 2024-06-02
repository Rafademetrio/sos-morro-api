export default {
    port: Number(process.env.PORT) || 3000,
    secretyKey: process.env.SECRETYKEY || 'd13005f9-5887-4935-8a2b-f221e32766c9',
    publicRoutes: process.env.PUBLICROUTES || [
        "users/create",
        "users/auth",

    ]
}