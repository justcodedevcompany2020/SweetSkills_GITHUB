import * as React from 'react';
import {useRef, useState, useEffect} from 'react';
import Svg, { Mask, Path, Rect, Circle, Defs, Stop, ClipPath, G } from "react-native-svg";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import {AuthContext} from "../../AuthContext/context";
import { useContext } from 'react';
import Footer from '../../includes/Footer';




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
    Platform
} from 'react-native';

import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";

function Recommendations (props) {


    const context = useContext(AuthContext);
    const [recommendations, setRecommendations] = useState([]);



    const redirectToSignInScreen = () => {
        props.navigation.navigate('SignInScreen')
    }

    useEffect(() => {

        const unsubscribe = props.navigation.addListener('focus', () => {
            getAllRecommendations()
        });

        return unsubscribe;
    }, [props.navigation])



    const getAllRecommendations = async () => {


        let userToken = await AsyncStorage.getItem('userToken');


        console.log(userToken, 'token')

        try {

            fetch('https://sweetskills.cc/api/shop', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    token: userToken,
                })


            }).then((response) => {
                return response.json()
            }).then(async (response ) => {

                console.log(response, 'allProducts')
                if (response.hasOwnProperty('category')) {
                     if (response.category == 'ok') {
                         setRecommendations(response.offers)
                     }
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    return (
        <SafeAreaView style={[styles.container]}>
                <View style={styles.recommendations_header}>
                    <Text style={styles.recommendations_header_title}>Рекомендации</Text>
                </View>

                <ScrollView style={styles.recommendation_main_wrapper}>
                        {recommendations.map((item, index) => {

                            return(
                                <View style={styles.recommendation_main_wrapper_child} key={index}>
                                    <Text style={styles.recommendation_main_wrapper_child_title}>{item.category}</Text>
                                    {item.type == 'inline' &&
                                     <ScrollView style={styles.recommendation_list_wrapper} horizontal={true}>
                                        {item.guides.map((item, index) => {
                                            return(
                                                <View key={index} style={styles.recommendation_list_item}>
                                                    <View style={styles.recommendation_list_item_img}>
                                                        <Image source={{uri: item.img}}  style={styles.recommendation_list_item_img_child}/>
                                                    </View>
                                                    <Text style={styles.recommendation_list_item_title} numberOfLines={2}>{item.title}</Text>
                                                    <Text style={styles.recommendation_list_item_info} numberOfLines={3}>{item.description}</Text>
                                                    <View style={styles.recommendation_list_item_price_wrapper}>
                                                        <Text style={styles.recommendation_list_item_price}>{item.price}</Text>
                                                        {item.old_price != item.price &&
                                                         <Text style={styles.recommendation_list_item_discounted_price}>{item.old_price}</Text>
                                                        }
                                                    </View>
                                                    <TouchableOpacity style={styles.recommendation_list_item_buy_btn}>
                                                        <Text style={styles.recommendation_list_item_buy_btn_text}>Купить</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )

                                        })}
                                    </ScrollView>
                                    }

                                    {item.type == 'vertical' &&
                                    <View style={styles.recommendation_list_wrapper2} >
                                        {item.guides.map((item, index) => {
                                            console.log(item, 'item')
                                            return(
                                                <View key={index} style={styles.recommendation_list_item2}>

                                                    <View style={styles.recommendation_list_item_img}>
                                                        {item.img ?
                                                             <Image source={{uri: item.img}}  style={styles.recommendation_list_item_img_child}/>
                                                             :
                                                            <Image source={require('../../../../assets/images/recommendations_img1.png')}  style={styles.recommendation_list_item_img_child}/>

                                                        }
                                                    </View>
                                                    <Text style={styles.recommendation_list_item_title} numberOfLines={2}>{item.title}</Text>
                                                    <Text style={styles.recommendation_list_item_info} numberOfLines={3}>{item.description}</Text>
                                                    <View style={styles.recommendation_list_item_price_wrapper}>
                                                        <Text style={styles.recommendation_list_item_price}>{item.price}</Text>
                                                        {item.old_price != item.price &&
                                                             <Text style={styles.recommendation_list_item_discounted_price}>{item.old_price}</Text>
                                                        }
                                                    </View>
                                                    <TouchableOpacity style={styles.recommendation_list_item_buy_btn}>
                                                        <Text style={styles.recommendation_list_item_buy_btn_text}>Купить</Text>
                                                    </TouchableOpacity>
                                                </View>
                                            )

                                        })}
                                    </View>

                                    }

                                </View>

                            )

                        })}

                </ScrollView>

            <Footer active_page={'recommendations'} navigation={props.navigation}/>

        </SafeAreaView>
    );
}

export default Recommendations;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff',
        width: "100%",
        height:  '100%',
        paddingTop: 30,

    },

    recommendations_header: {
        width: '100%',
        marginBottom: 16,
        paddingBottom: 11,
        borderBottomWidth: 1,
        borderBottomColor: '#6b76834d'
    },
    recommendations_header_title: {
        fontSize: 17,
        fontWeight: '500',
        color: '#1C1D1E',
        textAlign: 'center'
    },

    recommendation_main_wrapper: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    recommendation_main_wrapper_child: {
       width: '100%',
       marginBottom: 32,
    },

    recommendation_main_wrapper_child_title: {
        paddingHorizontal: 16,
        marginBottom: 16,
        fontSize: 20,
        fontWeight: '700',
        color: '#1C1D1E',
    },
    recommendation_list_wrapper: {
        width: '100%',
        paddingLeft: 16,
    },
    recommendation_list_wrapper2: {
       width: '100%',
       flexDirection: 'row',
       flexWrap: 'wrap',
       justifyContent: 'space-between',
       alignItems: 'center',
        paddingHorizontal: 16
    },
    recommendation_list_item: {
        width: 180,
        marginRight: 16,
    },
    recommendation_list_item2: {
        width: '48%',
        marginBottom: 16,
    },
    recommendation_list_item_img: {
        maxWidth: 180,
        width: '100%',
        height: 180,
        marginBottom: 8,
        position: 'relative',

    },
    recommendation_list_item_img_child: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    recommendation_list_item_title: {
        marginBottom: 8,
        fontSize: 14,
        fontWeight: '600',
        color: '#1C1D1E',
        height: 36,
    },
    recommendation_list_item_info: {
        marginBottom: 12,
        fontSize: 12,
        fontWeight: '400',
        color: '#6B7683',
    },

    recommendation_list_item_price_wrapper: {
        marginBottom: 16,
        flexDirection: 'row',
    },
    recommendation_list_item_price: {
        fontSize: 16,
        fontWeight: '700',
        color: '#1C1D1E',
        marginRight: 8,
    },
    recommendation_list_item_discounted_price: {
        fontSize: 16,
        fontWeight: '400',
        color: '#6B7683',
        textDecorationLine: 'line-through',
    },
    recommendation_list_item_buy_btn: {
        width: '100%',
        height: 40,
        backgroundColor: '#CCDD53',
        alignItems: 'center',
        justifyContent: 'center',
    },
    recommendation_list_item_buy_btn_text: {
        fontSize: 15,
        fontWeight: '700',
        color: '#ffffff',
    },
    guide_of_the_day_box: {
        position: 'absolute',
        width: 69,
        height: 24,
        backgroundColor: '#ffffff',
        zIndex: 9,
        right: 4,
        top: 4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    guide_of_the_day_box_text: {
        fontWeight: '600',
        fontSize: 12,
        color: '#1C1D1E',

    },
});
