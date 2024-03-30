import 'dotenv/config';
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(process.env.PG_URL, {
  define: {
    underscored: true,
  },
  logging: false,
});

export default sequelize;
