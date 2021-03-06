import scoreboard from './scoreboard';
import team from './team';
import defaultRouter from './defaultRouter';
import i18n from './i18n';
import counter from './counter';
import post from './post';
import upload from './upload';
import user from './user';
import subscription from './subscription';
import contact from './contact';
import pageNotFound from './pageNotFound';
import pagination from './pagination';
import './favicon';

import Feature from './connector';

export default new Feature(
  defaultRouter,
  scoreboard,
  team,
  counter,
  post,
  upload,
  user,
  subscription,
  contact,
  pagination,
  pageNotFound,
  i18n
);
