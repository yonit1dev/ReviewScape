import JwtTokenService from "../../../utils/security/token/JwtToken";
import AuthorizeController from "../../infrastructure/controllers/AuthorizeController";
import ReAuthorizeController from "../../infrastructure/controllers/ReAuthorizeController";
import {
  AuthorizeService,
  ReAuthorizationService,
} from "../../infrastructure/security/AuthorizeService";

const tokenGenerator = new JwtTokenService();
const authorizeService = new AuthorizeService(tokenGenerator);
const reAuthorizeService = new ReAuthorizationService(tokenGenerator);

const authorizeController = new AuthorizeController(authorizeService);
const reAuthorizeController = new ReAuthorizeController(reAuthorizeService);

export { authorizeController, reAuthorizeController };
