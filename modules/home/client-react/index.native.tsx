import React from 'react';
import { createStackNavigator } from 'react-navigation';

import { translate } from '@gqlapp/i18n-client-react';
import ClientModule from '@gqlapp/module-client-react-native';

import { HeaderTitle, IconButton } from '../../../packages/client/src/modules/common/components/native';
import Home from './containers/Home';
import resources from './locales';

const HeaderTitleWithI18n = translate('home')(HeaderTitle);

export default new ClientModule({
  drawerItem: [
    {
      Home: {
        screen: createStackNavigator({
          Home: {
            screen: Home,
            navigationOptions: ({ navigation }: any) => ({
              headerTitle: <HeaderTitleWithI18n style="subTitle" />,
              headerLeft: (
                <IconButton iconName="menu" iconSize={32} iconColor="#0275d8" onPress={() => navigation.openDrawer()} />
              ),
              headerStyle: { backgroundColor: '#fff' }
            })
          }
        }),
        navigationOptions: {
          drawerLabel: <HeaderTitleWithI18n />
        }
      }
    }
  ],
  localization: [{ ns: 'home', resources }]
});
