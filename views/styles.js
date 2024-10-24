import {
    StyleSheet
  } from 'react-native';

  module.exports = StyleSheet.create({
    listItemStyle:{
      borderWidth:1,
      borderColor:"blue",
      padding:5,
      backgroundColor:"green",
      width:"80%",
    },
    container: {
      flex: 1,
      backgroundColor:"black",
      color:"white",
      paddingBottom: 100
    },
    main: {
      padding: 12,
    },
    heading: {
       color: 'white', fontSize: 25 
    },
    formView:{
        flex:2,
        flexDirection:"column",
        backgroundColor:"f010101",
        alignItems:"center",
        justifyContent:"space-around",
        padding: 30,
        width:"100%",
    
    },
    textStyle: {
      color: 'white'
    },
    flexGrow: {
      flex:1,
      flexGrow: 1
    },
    listStyle:{
      flex:8,
      alignItems:"center",
      backgroundColor:"green",
      borderColor:"green",
      borderWidth:2,
      width:"100%",
    },
    inputStyle:{
      backgroundColor:"green",
      borderColor:"black",
      borderWidth:2,
      margin:2,
      padding:5,
      width:"50%",
    },
    buttonStyle:{
      backgroundColor:"green",
      borderColor:"green",
      borderWidth:2,
      margin:2,
      padding:5,
      width:"100%",
    },
  
    navbuttonstyle:{
      flex: 1,
      flexDirection: 'row',
      backgroundColor:"#def",
      alignItems:"center",
      justifyContent:"space-around",  
      backgroundColor: 'black',
      position: 'absolute',
      color: "white",
      bottom: 0
    },
    navBtn: {
      height: 100,
      flex:1,
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    trainText: {
      color: 'white'
    }
  });