import { View, Text, Switch, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useLanguage } from '@/contexts/LanguageContext';
import { Colors } from '@/constants/colors';

interface NotifPrefs {
  booking: boolean;
  tips: boolean;
  rewards: boolean;
  promos: boolean;
}

const DEFAULTS: NotifPrefs = { booking: true, tips: true, rewards: true, promos: false };

export default function NotificationsScreen() {
  const router = useRouter();
  const { t } = useLanguage();
  const [prefs, setPrefs] = useState<NotifPrefs>(DEFAULTS);

  useEffect(() => {
    AsyncStorage.getItem('notif_prefs').then(val => {
      if (val) setPrefs(JSON.parse(val));
    });
  }, []);

  const toggle = (key: keyof NotifPrefs) => {
    setPrefs(prev => {
      const next = { ...prev, [key]: !prev[key] };
      AsyncStorage.setItem('notif_prefs', JSON.stringify(next));
      return next;
    });
  };

  const rows: { key: keyof NotifPrefs; icon: string; label: string; desc: string }[] = [
    { key: 'booking', icon: 'calendar-outline', label: t('notif_booking'), desc: t('notif_booking_desc') },
    { key: 'tips', icon: 'bulb-outline', label: t('notif_tips'), desc: t('notif_tips_desc') },
    { key: 'rewards', icon: 'trophy-outline', label: t('notif_rewards'), desc: t('notif_rewards_desc') },
    { key: 'promos', icon: 'pricetag-outline', label: t('notif_promos'), desc: t('notif_promos_desc') },
  ];

  return (
    <SafeAreaView style={styles.safe} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={Colors.dark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>{t('profile_notifications')}</Text>
        <View style={{ width: 22 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        <Text style={styles.hint}>Manage which notifications you receive from Seasonly.</Text>
        {rows.map(row => (
          <View key={row.key} style={styles.row}>
            <View style={styles.iconCircle}>
              <Ionicons name={row.icon as any} size={20} color={Colors.primary} />
            </View>
            <View style={styles.rowText}>
              <Text style={styles.rowLabel}>{row.label}</Text>
              <Text style={styles.rowDesc}>{row.desc}</Text>
            </View>
            <Switch
              value={prefs[row.key]}
              onValueChange={() => toggle(row.key)}
              trackColor={{ false: '#E0D9D3', true: Colors.primaryLight }}
              thumbColor={prefs[row.key] ? Colors.primary : '#fff'}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: { fontSize: 17, fontWeight: '700', color: Colors.dark },
  scroll: { padding: 20 },
  hint: { fontSize: 13, color: Colors.subtle, marginBottom: 24 },
  row: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  rowText: { flex: 1 },
  rowLabel: { fontSize: 15, fontWeight: '700', color: Colors.dark, marginBottom: 2 },
  rowDesc: { fontSize: 12, color: Colors.subtle },
});
