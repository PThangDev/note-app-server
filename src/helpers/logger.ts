import pino from 'pino';
import dayjs from 'dayjs';

const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  },
  base: {
    pid: false,
  },
  timestamp: () => `,"Time":"${dayjs().format()}"`,
});

export default logger;
