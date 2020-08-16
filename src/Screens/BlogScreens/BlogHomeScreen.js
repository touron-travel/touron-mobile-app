import React from 'react';
import { StyleSheet, Text, View ,Button} from 'react-native';


const BlogHomeScreen = ({navigation}) =>{
    return (
        <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <Text>BlogHome Screen</Text>

        <Button title="Blog Inner" onPress={()=>navigation.navigate('BlogInner') }/>
        </View>
    )
}

export default BlogHomeScreen