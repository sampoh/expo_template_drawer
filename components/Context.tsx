import * as React from 'react';
import {typeSession} from './Cast';

export type typeContextSession = {
    sessionInfo:typeSession
    setSessionInfo:React.Dispatch<React.SetStateAction<typeSession>>
  }
  
export const SessionContext = React.createContext<typeContextSession>(undefined as any);
export const useSessionContext = () => React.useContext(SessionContext);
