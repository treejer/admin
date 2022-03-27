// export default async ({ app }) => {
//   if (app.context.route.path === "/forests") {
//     return;
//   } else {
//     app.$axios.setHeader("Accept", "application/json, text/plain, */*");
//     app.$axios.setHeader("Access-Control-Allow-Origin", "*/*");
//     app.$axios.onRequest(() => {
//       app.$axios.setHeader("Accept", "application/json, text/plain, */*");
//       app.$axios.setHeader("x-auth-userid", app.$cookies.get("userId"));
//       app.$axios.setHeader("x-auth-logintoken", app.$cookies.get("loginToken"));
//     });
//   }
// };
