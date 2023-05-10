import * as React from 'react';
import  { useState, useRef } from 'react';
import Svg, { Mask, Path, Rect, Circle, Defs, Stop, ClipPath, G, Use, Pattern, } from "react-native-svg";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';



// Svg  import

import RecommendationsNonActiveSvg from '../../../assets/svg/recommendationsNonActive';
import RecommendationsActiveSvg from '../../../assets/svg/recommendationsActive';
import TrainingNonActiveSvg from '../../../assets/svg/trainingNonActive';
import TrainingActiveSvg from '../../../assets/svg/trainingActive';
import NewslineNonActive from '../../../assets/svg/newslineNonActive';
import NewslineActive from '../../../assets/svg/newslineActive';
import AccountNonActiveSvg from '../../../assets/svg/accountNonActive';
import AccountActive from '../../../assets/svg/accountActive';



import {
    Text,
    Alert,
    Button,
    View,
    StyleSheet,
    TouchableOpacity,
    Image,
    TextInput,
    ActivityIndicator,
    ImageBackground,
    ScrollView,
    Dimensions
} from 'react-native';

import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';


const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function Footer (props) {


    const redirectToRecommendations = () => {
        props.navigation.navigate('RecommendationsScreen')

    }
    const redirectToMyTrainingScreen = () => {
        props.navigation.navigate('MyTrainingScreen')

    }
    const redirectToNewsLineScreen = () => {
        props.navigation.navigate('NewsLineScreen')

    }
    const redirectToAccountScreen = () => {
        props.navigation.navigate('AccountScreen')

    }






    return (
      <View style={styles.footer}>

        <View style={styles.footer_wrapper}>
            {props.active_page == 'recommendations' ?
                <TouchableOpacity style={styles.footer_item}>
                    <RecommendationsActiveSvg/>
                    <Text style={styles.footer_active_page_title}>Рекомендации</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity onPress={() => redirectToRecommendations()} style={styles.footer_item}>
                    <RecommendationsNonActiveSvg/>
                    <Text style={styles.footer_non_active_page_title}>Рекомендации</Text>
                </TouchableOpacity>
            }


            {props.active_page == 'training' ?
                <TouchableOpacity style={styles.footer_item}>
                    <TrainingActiveSvg/>
                    <Text style={styles.footer_active_page_title}>Мое обучение</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.footer_item} onPress={() => redirectToMyTrainingScreen()}>
                    <TrainingNonActiveSvg/>
                    <Text style={styles.footer_non_active_page_title}>Мое обучение</Text>
                </TouchableOpacity>
            }


            {props.active_page == 'newsline' ?
                <TouchableOpacity style={styles.footer_item}>
                    <NewslineActive/>
                    <Text style={styles.footer_active_page_title}>Лента новостей</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.footer_item} onPress={() => redirectToNewsLineScreen()}>
                    <NewslineNonActive/>
                    <Text style={styles.footer_non_active_page_title}>Лента новостей</Text>
                </TouchableOpacity>
            }

            {props.active_page == 'account' ?
                <TouchableOpacity style={styles.footer_item}>
                    <AccountActive/>
                    <Text style={styles.footer_active_page_title}>Учётная запись</Text>
                </TouchableOpacity>
                :
                <TouchableOpacity style={styles.footer_item} onPress={() => redirectToAccountScreen()}>
                    <AccountNonActiveSvg/>
                    <Text style={styles.footer_non_active_page_title}>Учётная запись</Text>
                </TouchableOpacity>
            }


        </View>

      </View>
    );
}

export default Footer;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: '#ffffff',
        width: "100%",
        height: "100%",


    },

    footer: {
        backgroundColor: '#ffffff',
        width: '100%',
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#6b7683',
        shadowOffset: { width: 0, height: 0.5 },
        shadowOpacity: 0.3,
        shadowRadius: 2,
        elevation: 10,
    },
    footer_wrapper: {
        paddingHorizontal: 12,
        paddingTop: 10,
        paddingBottom: 19,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        width: '100%'
    },

    footer_active_page_title: {
        fontWeight: '500',
        fontSize: 10,
        color: '#1C1D1E',
    },
    footer_non_active_page_title: {
        fontWeight: '500',
        fontSize: 10,
        color: '#6B7683',
    },
    footer_item: {
        justifyContent: 'center',
        alignItems: 'center',
    }

});
