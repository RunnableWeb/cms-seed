import { Injectable } from '@angular/core';
@Injectable()
export class LogService {
  // private debugLevel = 'ERROR'

  LEVELS = {
    ERROR: 'ERROR',
    INFO: 'INFO',
    WARN: 'WARN'
  }

  constructor() { }

  info(entityName, message) {
    const {LEVELS, _formatMsg} = this;
    const msg = _formatMsg(LEVELS.WARN, entityName, message);
    console.info(msg);
  }

  warning(entityName, message) {    
    const {LEVELS, _formatMsg} = this;
    const msg = _formatMsg(LEVELS.WARN, entityName, message);
    console.warn(msg);
  }

  error(entityName, message, err) {
    const {LEVELS, _formatMsg} = this;
    const msg = _formatMsg(LEVELS.ERROR, entityName, message, err);
    console.error(msg);
  }

  private _formatMsg(level, fileName, msg, obj?: object) {
      return `[${level}][${fileName}] - ${msg} ${obj ? `- ${obj}`: ''}`;
  }

}
