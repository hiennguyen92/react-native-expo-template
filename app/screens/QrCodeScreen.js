import React, { Component } from 'react'
import {
  Alert,
  Linking,
  Dimensions,
  LayoutAnimation,
  Text,
  View,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'


import { BarCodeScanner, Permissions } from 'expo'
import HeaderButton from '../components/HeaderButton';

const styles = StyleSheet.create({
  iconAlign: { alignSelf: 'center' },
  drawerToggle: { padding: 20 },
  headerStyle: { backgroundColor: '#fff' },
  headerTitleStyle: { fontWeight: 'bold' },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 15,
    flexDirection: 'row',
  },
  url: {
    flex: 1,
  },
  urlText: {
    color: '#fff',
    fontSize: 20,
  },
  cancelButton: {
    marginLeft: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelButtonText: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 18,
  },
})

class QrCodeScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
      headerStyle: styles.headerStyle,
      headerTintColor: '#000',
      headerTitleStyle: styles.headerTitleStyle,
      headerRight: HeaderButton({
				navigation: navigation,
				iconNameAndroid: 'menu',
				iconColor: '#000',
				onPress: () => {
					AsyncStorage.clear();
					navigation.navigate('auth');
				}
			}),
    });

    constructor(props) {
      super(props)
      this.state = {
        hasCameraPermission: null,
        lastScannedUrl: null,
      }
    }

    componentDidMount() {
      this._requestCameraPermission()
    }

    _requestCameraPermission = async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA)
      this.setState({
        hasCameraPermission: status === 'granted',
      })
    };

    _handleBarCodeRead = (result) => {
      if (result.data !== this.state.lastScannedUrl) {
        LayoutAnimation.spring()
        this.setState({ lastScannedUrl: result.data })
      }
    };

    _handlePressUrl = () => {
      Alert.alert(
        'Open this URL?',
        this.state.lastScannedUrl,
        [
          {
            text: 'Yes',
            onPress: () => Linking.openURL(this.state.lastScannedUrl),
          },
          { text: 'No', onPress: () => {} },
        ],
        { cancellable: false },
      )
    };

      _handlePressCancel = () => {
        this.setState({ lastScannedUrl: null })
      };

    _maybeRenderUrl = () => {
      if (!this.state.lastScannedUrl) {
        return
      }

      return (
        <View style={styles.bottomBar}>
          <TouchableOpacity style={styles.url} onPress={this._handlePressUrl}>
            <Text numberOfLines={1} style={styles.urlText}>
              {this.state.lastScannedUrl}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={this._handlePressCancel}
          >
            <Text style={styles.cancelButtonText}>
                Cancel
            </Text>
          </TouchableOpacity>
        </View>
      )
    };


    render() {
      return (
        <View
          style={{
            flex: 1,
            backgroundColor: '#c0392b',
          }}
        >

          {this.state.hasCameraPermission === null
            ? <Text>Requesting for camera permission</Text>
            : this.state.hasCameraPermission === false
              ? (
                <Text style={{ color: '#fff' }}>
                        Camera permission is not granted
                </Text>
              )
              : (
                <BarCodeScanner
                  onBarCodeRead={this._handleBarCodeRead}
                  style={{
                    height: Dimensions.get('window').height,
                    width: Dimensions.get('window').width,
                  }}
                />
              )}

          {this._maybeRenderUrl()}
        </View>
      )
    }
}

export default QrCodeScreen
