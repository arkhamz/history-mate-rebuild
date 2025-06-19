import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/Home.tsx"),
  route("atlas", "routes/Atlas.tsx"),
  route("battles/:id", "routes/BattleDetail.tsx"),
  route("commanders", "routes/Commanders.tsx"),
  route("commanders/:id", "routes/CommanderDetail.tsx"),
  route("background", "routes/Background.tsx"),
  route("signup", "routes/Signup.tsx"),
  route("login", "routes/Login.tsx"),
  route("*", "routes/Error.tsx"),
] satisfies RouteConfig;

//CONFIGURE ROUTES HERE
