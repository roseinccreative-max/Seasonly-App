import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { Colors } from '@/constants/colors';
import { useLanguage } from '@/contexts/LanguageContext';

const isWeb = Platform.OS === 'web';
const isIOS = Platform.OS === 'ios';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

function TabIcon({ focused, name, activeName, color }: { focused: boolean; name: IconName; activeName: IconName; color: string }) {
  return <Ionicons name={focused ? activeName : name} size={24} color={color} />;
}

export default function TabLayout() {
  const { t } = useLanguage();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.gold,
        tabBarInactiveTintColor: '#AAAAAA',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 1,
          borderTopColor: '#F0EAE4',
          paddingBottom: isIOS ? 20 : isWeb ? 14 : 10,
          paddingTop: 8,
          height: isIOS ? 82 : isWeb ? 80 : 65,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.06,
          shadowRadius: 8,
          elevation: 10,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginTop: 2,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t('tab_home'),
          tabBarIcon: ({ color, focused }) => (
            <TabIcon focused={focused} name="home-outline" activeName="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="book"
        options={{
          title: t('tab_book'),
          tabBarIcon: ({ color, focused }) => (
            <TabIcon focused={focused} name="calendar-outline" activeName="calendar" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="rewards"
        options={{
          title: t('tab_rewards'),
          tabBarIcon: ({ color, focused }) => (
            <TabIcon focused={focused} name="star-outline" activeName="star" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="shop"
        options={{
          title: t('tab_shop'),
          tabBarIcon: ({ color, focused }) => (
            <TabIcon focused={focused} name="bag-outline" activeName="bag" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: t('tab_profile'),
          tabBarButton: () => null,
        }}
      />
    </Tabs>
  );
}
