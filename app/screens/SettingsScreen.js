import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {FontAwesome} from "@expo/vector-icons";

const styles = {
  iconAlign: { alignSelf: "center"},
  drawerToggle: { padding: 20 },
  headerStyle: { backgroundColor: "#fff"},
  headerTitleStyle: {fontWeight: "bold"},
}

class SettingsScreen extends Component {
  static navigationOptions = ({ navigation }) => {
      return {
              headerStyle: styles.headerStyle, 
              headerTintColor: "#000", 
              headerTitleStyle: styles.headerTitleStyle, 
              headerRight: (
                          <TouchableOpacity
                              style={styles.drawerToggle}
                              onPress={() => {
                              navigation.navigate("DrawerToggle");
                          }}>
                              <FontAwesome 
                                  style={styles.iconAlign} 
                                  name="bars" 
                                  size={28} 
                                  color="#333333"/>
                          </TouchableOpacity>
          )};
  };

  constructor(props) {
    super(props);
    this.state = {};
  }
  
  render() {
    return (<View    
              style={{
                flex: 1,
                backgroundColor: "#c0392b"
              }}
            >
              <Text>SettingsScreen</Text>
            </View>);
  }
}

export default SettingsScreen;
