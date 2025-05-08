import { SetMetadata, } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

// export const UnNeedAuth = (...args: string[]) => SetMetadata('un-need-auth', [true, ...args]);
export const useUnNeedAuth = Reflector.createDecorator<Boolean>();

export const UnNeedAuth = () => useUnNeedAuth(true)