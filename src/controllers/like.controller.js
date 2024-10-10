import initModels from "../models/init-models.js";
import sequelize from "../models/connect.js";
import {
  BAD_REQUEST_ERROR_STATUS,
  INTERNAL_SERVER_ERROR_STATUS,
  OK_STATUS,
} from "../common/status.js";


const model = initModels(sequelize);