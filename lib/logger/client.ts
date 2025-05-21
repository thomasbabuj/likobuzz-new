const clientLogger = {
  error: (...args: any[]) => console.error(...args),
  warn: (...args: any[]) => console.warn(...args),
  info: (...args: any[]) => console.info(...args),
  http: (...args: any[]) => console.log(...args),
  debug: (...args: any[]) => console.debug(...args),
};

export default clientLogger;
