import * as React from 'react';
import {useEffect, useRef, useState} from 'react';
import Svg, { Mask, Path, Rect, Circle, Defs, Stop, ClipPath, G } from "react-native-svg";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';
import {AuthContext} from "../../AuthContext/context";
import { useContext } from 'react';
import Footer from '../../includes/Footer';
import ReadMore from '@fawazahmed/react-native-read-more'
import BackCoursesIcon from  '../../../../assets/svg/backCoursesIcon';
import moment from "moment";


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
    Platform,
    FlatList
} from 'react-native';

import {
    SafeAreaView,
    SafeAreaProvider,
    SafeAreaInsetsContext,
    useSafeAreaInsets,
    initialWindowMetrics,
} from 'react-native-safe-area-context';
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {get} from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

function NewsLine (props) {

    const context = useContext(AuthContext);



    const [news_list, setNewsList] = useState([]);
    const [current_page, setCurrentPage] = useState(1);
    const [last_page, setLastPage] = useState(1);
    const [loading_news, setLoadingNews] = useState(false);


    useEffect(() => {

        const unsubscribe = props.navigation.addListener('focus', () => {
                getNews()
        });

        return unsubscribe;
    }, [props.navigation])



    const getNews = async () => {
        let userToken = await AsyncStorage.getItem('userToken');

        console.log(userToken);
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let raw = JSON.stringify({
            token: userToken,
            page: current_page
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://sweetskills.cc/api/news", requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(typeof result, 'news')
                if (result.hasOwnProperty('status')) {
                    if (result.status == 'ok') {
                        setNewsList(result.news)
                        setLastPage(result.pages)
                    }
                }
            })
            .catch(error => console.log('error', error));
    }
    const loadMoreNews = async () => {

        console.log(current_page,current_page == last_page, 'pageeeeeeeeeeeeeeeee');

        if (current_page == last_page) {
            return false;
        }
     let userToken = await AsyncStorage.getItem('userToken');

        setLoadingNews(true)
        console.log(userToken);
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        let new_page = current_page + 1;


        let raw = JSON.stringify({
            token: userToken,
            page: new_page
        });

        let requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("https://sweetskills.cc/api/news", requestOptions)
            .then(response => response.json())
            .then(result => {
                setLoadingNews(false)


                if (result.hasOwnProperty('status')) {
                    if (result.status == 'ok') {

                        setCurrentPage(new_page)
                        let more_news = result.news;

                        more_news.forEach(function(item){
                            news_list.push(item)
                        })
                        console.log(more_news, 'more_news')

                    }
                }
            })
            .catch(error => console.log('error', error));
    }
    // const moment = require('moment');


    const getTime =  (date) => {
         let timestamp = date;
         timestamp = timestamp.substring(0, 10);
         date = new Date(timestamp);

         let options = { day: 'numeric', month: 'long', year: 'numeric' };
         let formattedDate = date.toLocaleDateString('ru-RU', options);

         console.log(formattedDate);
         return formattedDate;
    }



    return (
        <SafeAreaView style={[styles.container]}>
            <View style={styles.news_line_header}>
                <Text style={styles.news_line_header_title}>Лента новостей</Text>
            </View>


            <View style={styles.news_line_wrapper}>
                <View style={styles.news_line_wrapper_child_items_list_wrapper}>
                    {/*{news_list.length > 0 && news_list.map((item, index) => {*/}
                    {/*    console.log(item, 'item');*/}
                    {/*    return(*/}
                    {/*        <TouchableOpacity key={index} style={styles.news_line_child_items_list_item}>*/}
                    {/*            <View style={styles.news_line_child_items_list_item_avatar_name_wrapper}>*/}
                    {/*                <View style={styles.news_line_child_items_list_item_avatar}>*/}
                    {/*                    <Image source={{uri: item?.avatar}} style={styles.news_line_child_items_list_item_avatar_child} />*/}
                    {/*                </View>*/}
                    {/*                <Text style={styles.news_line_child_items_list_item_name}>{item?.publisher}</Text>*/}
                    {/*            </View>*/}
                    {/*            {item.img &&*/}
                    {/*            <View style={styles.news_line_child_items_list_item_img}>*/}
                    {/*                <Image source={{uri: item?.img}} style={styles.news_line_child_items_list_item_img_child}/>*/}
                    {/*            </View>*/}
                    {/*            }*/}

                    {/*            <View style={styles.news_line_child_items_list_item_info_box}>*/}
                    {/*                <Text style={styles.news_line_child_items_list_item_avatar_info_title}>{item?.title}</Text>*/}
                    {/*                <Text style={styles.news_line_child_items_list_item_avatar_info_text}>{item?.text}</Text>*/}
                    {/*                /!*<Text style={styles.news_line_child_items_list_item_avatar_info_date_text}>{item.date}</Text>*!/*/}
                    {/*            </View>*/}


                    {/*        </TouchableOpacity>*/}
                    {/*    )*/}

                    {/*})}*/}

                    <FlatList
                        data={news_list}
                        renderItem={({item}, index) => (
                            <TouchableOpacity key={index} style={styles.news_line_child_items_list_item}>
                                <View style={styles.news_line_child_items_list_item_avatar_name_wrapper}>
                                    <View style={styles.news_line_child_items_list_item_avatar}>
                                        <Image source={{uri: item?.avatar}} style={styles.news_line_child_items_list_item_avatar_child} />
                                    </View>
                                    <Text style={styles.news_line_child_items_list_item_name}>{item?.publisher}</Text>
                                </View>
                                {item.img &&
                                <View style={styles.news_line_child_items_list_item_img}>
                                    <Image source={{uri: item?.img}} style={styles.news_line_child_items_list_item_img_child}/>
                                </View>
                                }

                                <View style={styles.news_line_child_items_list_item_info_box}>
                                    <Text style={styles.news_line_child_items_list_item_avatar_info_title}>{item?.title}</Text>
                                    <Text style={styles.news_line_child_items_list_item_avatar_info_text}>{item?.text}</Text>
                                    <Text style={styles.news_line_child_items_list_item_avatar_info_date_text}>
                                        {getTime(item.date)}
                                    </Text>



                                </View>


                            </TouchableOpacity>

                        )}

                        keyExtractor={(item, index) => index.toString()}
                        onEndReached={() => loadMoreNews()}
                        onEndReachedThreshold={0.5}
                        // keyExtractor={item => item.id}
                    />

                    {loading_news &&
                    <View style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        alignSelf: 'center',
                        width: '100%',
                        height: 40,
                        position: 'absolute',
                        bottom: 60
                    }}>
                        <ActivityIndicator size="large" color="#3C6954"/>
                    </View>
                    }
                </View>

            </View>

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
