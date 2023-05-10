import * as React from 'react';
import {useRef, useState} from 'react';
import Svg, { Mask, Path, Rect, Circle, Defs, Stop, ClipPath, G } from "react-native-svg";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import {AuthContext} from "../../AuthContext/context";
import { useContext } from 'react';
import Footer from '../../includes/Footer';
import ReadMore from '@fawazahmed/react-native-read-more'


import BackCoursesIcon from  '../../../../assets/svg/backCoursesIcon';


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

function NewsLine (props) {






    const context = useContext(AuthContext);

    const news_line = [
        {

            img: require('../../../../assets/images/news_line_img.png'),
            name: 'administrator',
            avatar: require('../../../../assets/images/avatar_img.png'),
            title: 'Макаронс "Сердечки"',
            info: 'Небольшое и лёгкое печенье-безе с мягкой начинкой и суховатой хрустящей корочкой; оно круглой формы и состоит из двух.',
            date: '23 апреля 2023',
        },
        {

            // img: require('../../../../assets/images/news_line_img.png'),
            name: 'administrator',
            avatar: require('../../../../assets/images/avatar_img.png'),
            title: 'Макаронс "Сердечки"',
            info: 'Небольшое и лёгкое печенье-безе с мягкой начинкой и суховатой хрустящей корочкой; оно круглой формы и состоит из двух.',
            date: '23 апреля 2023',
        },




    ];



    const redirectToTrainingScreen = () => {
        props.navigation.navigate('MyTrainingScreen')
    }



    return (
        <SafeAreaView style={[styles.container]}>
            <View style={styles.news_line_header}>
                <Text style={styles.news_line_header_title}>Лента новостей</Text>
            </View>


            <ScrollView style={styles.news_line_wrapper}>
                <View style={styles.news_line_wrapper_child_items_list_wrapper}>
                    {news_line.map((item, index) => {
                        return(
                            <TouchableOpacity key={index} style={styles.news_line_child_items_list_item}>
                                <View style={styles.news_line_child_items_list_item_avatar_name_wrapper}>
                                    <View style={styles.news_line_child_items_list_item_avatar}>
                                        <Image source={item.avatar} style={styles.news_line_child_items_list_item_avatar_child} />
                                    </View>
                                    <Text style={styles.news_line_child_items_list_item_name}>{item.name}</Text>
                                </View>
                                {item.img &&
                                    <View style={styles.news_line_child_items_list_item_img}>
                                        <Image source={item.img} style={styles.news_line_child_items_list_item_img_child}/>
                                    </View>
                                }

                                <View style={styles.news_line_child_items_list_item_info_box}>
                                    <Text style={styles.news_line_child_items_list_item_avatar_info_title}>{item.title}</Text>
                                    <Text style={styles.news_line_child_items_list_item_avatar_info_text}>{item.info}</Text>
                                    <Text style={styles.news_line_child_items_list_item_avatar_info_date_text}>{item.date}</Text>
                                </View>


                            </TouchableOpacity>
                        )

                    })}
                </View>

            </ScrollView>

            <Footer active_page={'newsline'} navigation={props.navigation}/>

        </SafeAreaView>
    );
}

export default NewsLine;


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

    news_line_header: {
        width: '100%',
        marginBottom: 16,
        paddingBottom: 11,
        borderBottomWidth: 1,
        borderBottomColor: '#6b76834d',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        paddingHorizontal: 16,

    },
    news_line_header_title: {
        fontSize: 17,
        fontWeight: '500',
        color: '#1C1D1E',
        textAlign: 'center'
    },

    news_line_wrapper: {
        flex: 1,
        width: '100%',
        height: '100%',
    },

    news_line_child_items_list_item: {
        width: '100%',
        marginBottom: 15,
        shadowColor: '#00000066',
        shadowOffset: { width: 0, height: 4 },
        // shadowOpacity: 0.4,
        shadowRadius: 75,
        elevation: 10,
        backgroundColor: '#ffffff'
    },
    news_line_child_items_list_item_avatar_name_wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 12,
        paddingHorizontal: 16,
    },
    news_line_child_items_list_item_avatar: {
        width: 32,
        height: 32,
        marginRight: 12
    },
    news_line_child_items_list_item_avatar_child: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },

    news_line_child_items_list_item_name: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1C1D1E',
    },

    news_line_child_items_list_item_img: {
        width: '100%',
        height: 500,
        marginBottom: 12
    },
    news_line_child_items_list_item_img_child: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover'
    },
    news_line_child_items_list_item_info_box: {
        marginBottom: 16,
        paddingHorizontal: 16,
    },
    news_line_child_items_list_item_avatar_info_title: {
        fontSize: 15,
        fontWeight: '700',
        color: '#1C1D1E',
        marginBottom: 8,
    },
    news_line_child_items_list_item_avatar_info_text: {
        fontSize: 14,
        fontWeight: '400',
        color: '#333435',
        marginBottom: 8,
    },
    news_line_child_items_list_item_avatar_info_date_text: {
        fontSize: 12,
        fontWeight: '400',
        color: '#6B7683',
    },

});
