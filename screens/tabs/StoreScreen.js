//import liraries
import React, { useContext, useState } from 'react';
import { useEffect } from 'react';
import { View, Text, StyleSheet, ImageBackground } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { scrollInterpolator, animatedStyles } from "../../utils/Animations";
import { windowHeight, windowWidth } from "../../utils/Dimensions";

const SLIDER_WIDTH = windowWidth;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.9);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

const DATA = [];
for (let i = 0; i < 3; i++) {
  DATA.push(i)
}

// create a component
const StoreScreen = ({ navigation }) => {

  const [state,setState] = useState({ index : 0 });

  useEffect(()=> {
    navigation.setOptions({ title : "Store" });
  }, [])
  
  const cellWidth = windowWidth / 5;

  console.log(cellWidth)
  
  return (
    <View style={styles.container}>
      <Text style={styles.descText}>
        You will be able to order any of the stickers below, keep following... 
      </Text>
      <View>
        <Carousel
          data={DATA}
          renderItem={ ({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemLabel}>{`Item ${item}`}</Text>
            </View>
          ) }
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
          containerCustomStyle={styles.carouselContainer}
          inactiveSlideShift={0}
          onSnapToItem={(index) => setState({ ... state, index : index })}
          scrollInterpolator={scrollInterpolator}
          slideInterpolatedStyle={animatedStyles}
          useScrollView={true}          
        />
        <Text style={styles.counter}
        >
          {state.index}
        </Text>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  header: {
    borderWidth: 1,
    width: "90%",
    marginTop: 20,
    
    height: windowHeight * 0.2
  },
  headerImage: {
    height: "100%",
    width: "100%",
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 25,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10,
    color: "#FFF",
    fontWeight: "bold"
  },
  descText:{
    fontSize: 25,
    color: "#333",
    fontWeight: "bold",
    width: "90%",
    marginTop: 15,
    textAlign: 'center'
  },
  carouselContainer: {
    marginTop: 30
  },
  itemContainer: {
    width: ITEM_WIDTH,
    height: ITEM_HEIGHT,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'dodgerblue'
  },
  itemLabel: {
    color: 'white',
    fontSize: 24
  },
  counter: {
    marginTop: 25,
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center'
  }
});

//make this component available to the app
export default StoreScreen;
