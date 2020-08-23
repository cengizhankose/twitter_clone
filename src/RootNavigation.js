
import * as React from 'react';
import { StackActions } from '@react-navigation/native';

export const navigationRef = React.createRef();

export function navigate(name, params) {
  console.log('Gelen: ', navigationRef.current);
  navigationRef.current?.navigate(name, params);
}

export function replace(...args) {
  navigationRef.current?.dispatch(StackActions.replace(...args));
}


export function pop() {
  navigationRef.current?.dispatch(StackActions.pop());
}
