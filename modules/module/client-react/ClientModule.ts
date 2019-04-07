import React from 'react';
import BaseModule, { BaseModuleShape } from './BaseModule';

export interface ClientModuleShape extends BaseModuleShape {
  route?: Array<React.ReactElement<any>>;
  navItem?: Array<React.ReactElement<any>>;
  navItemRight?: Array<React.ReactElement<any>>;
  navItemTest?: Array<React.ReactElement<any>>;
  navItemUser?: Array<React.ReactElement<any>>;
  navItemAdmin?: Array<React.ReactElement<any>>;
  stylesInsert?: string[];
  scriptsInsert?: string[];
}

interface ClientModule extends ClientModuleShape {}

class ClientModule extends BaseModule {
  constructor(...modules: ClientModuleShape[]) {
    super(...modules);
  }

  get routes() {
    return this.route.map((component: React.ReactElement<any>, idx: number, items: Array<React.ReactElement<any>>) =>
      React.cloneElement(component, { key: component.key || idx + items.length })
    );
  }

  get navItems() {
    return this.navItem
      ? this.navItem.map((component: React.ReactElement<any>, idx: number, items: Array<React.ReactElement<any>>) =>
          React.cloneElement(component, {
            key: component.key || idx + items.length
          })
        )
      : null;
  }

  get navItemsRight() {
    return this.navItemRight
      ? this.navItemRight.map(
          (component: React.ReactElement<any>, idx: number, items: Array<React.ReactElement<any>>) =>
            React.cloneElement(component, {
              key: component.key || idx + items.length
            })
        )
      : false;
  }

  get navItemsTest() {
    return this.navItemTest
      ? this.navItemTest.map((component: React.ReactElement<any>, idx: number, items: Array<React.ReactElement<any>>) =>
          React.cloneElement(component, {
            key: component.key || idx + items.length
          })
        )
      : false;
  }

  get navItemsUser() {
    return this.navItemUser
      ? this.navItemUser.map((component: React.ReactElement<any>, idx: number, items: Array<React.ReactElement<any>>) =>
          React.cloneElement(component, {
            key: component.key || idx + items.length
          })
        )
      : false;
  }

  get navItemsAdmin() {
    return this.navItemAdmin
      ? this.navItemAdmin.map(
          (component: React.ReactElement<any>, idx: number, items: Array<React.ReactElement<any>>) =>
            React.cloneElement(component, {
              key: component.key || idx + items.length
            })
        )
      : false;
    return false;
  }

  get stylesInserts() {
    return this.stylesInsert || [];
  }

  get scriptsInserts() {
    return this.scriptsInsert || [];
  }
}

export default ClientModule;
