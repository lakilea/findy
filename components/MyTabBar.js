import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function MyTabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }

  return (
    <View style={{ backgroundColor: "#f4f4f4", height: 80, paddingTop: 10 }}>
      <View style={{ flexDirection: 'row', width: "100%", justifyContent:"center", backgroundColor:"#f4f4f4" }}>
        <View style={styles.leftBar}></View>
        <View style={{ width:"16%" }}>
          <View style={styles.centerBar}></View>
        </View>
        <View style={styles.rightBar}></View>
      </View>

      <View style={{ flexDirection: "row", justifyContent: "center"}}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const Icon = options.tabBarIcon;
          const TabBarCustomIcon = options.tabBarCustomIcon;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ width: "20%", alignItems: "center", justifyContent: "flex-end", marginTop: -55 }}
            >
              { Icon? <Icon color={isFocused ? '#f69833' : '#b5c1c9'}></Icon> : null }
              <Text style={[{ color: isFocused ? '#f69833' : '#b5c1c9' }, styles.textStyle ]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textStyle : {
    fontFamily: "SF-Pro-Display",
    fontSize: 11,
    fontWeight: "500",
    fontStyle: "normal",
    letterSpacing: 0,
    textAlign: "center",
    marginBottom: 10,
    marginTop: 7
  },
  leftBar : {
    width:"42%", 
    borderColor: "rgba(171, 180, 189, 0.35)",
    height: 21, 
    borderTopWidth: 1, 
    borderRightWidth: 1, 
    borderTopEndRadius:50,
  },
  centerBar : {
    width:"100%", 
    borderColor: "rgba(171, 180, 189, 0.35)",
    height: 21, 
    marginTop:20, 
    borderBottomWidth: 1, 
    borderLeftWidth: 1, 
    borderRightWidth: 1, 
    borderBottomStartRadius: 50, 
    borderBottomEndRadius: 50
  },
  rightBar: { 
    width:"42%", 
    borderColor: "rgba(171, 180, 189, 0.35)",
    height: 21, 
    borderTopWidth: 1, 
    borderLeftWidth: 1, 
    borderTopStartRadius:50 
  }
});