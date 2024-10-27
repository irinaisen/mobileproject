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
      backgroundColor:'black'
    },
    heading: {
       color: 'white', fontSize: 25 
    },
    h2: {

        color: 'white', fontSize: 18, fontWeight:'bold'

    },
    h3: {

      color: 'white', fontSize: 16, fontWeight:'bold'

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
    iconStyle: {
tintColor:'white'
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
    link:{
color: 'green',
height: 50,
fontSize: 16,
fontWeight:'bold',
textDecorationLine:'underline'

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
    },
    trainItem: {
      flex:1,
      justifyContent:'flex-start',
      flexDirection: 'column',
      flexWrap:'nowrap',
      color: 'white',
      marginTop:10,

  },
  trainDataRow: {
      flex:1,
      minHeight:100,
      alignContent:'flex-start',
      justifyContent:'space-evenly',
      color: 'white',


  },
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
    backgroundColor: 'black'
  },
  dropdown: {
     backgroundColor: 'green',
     color: 'white',
    //margin: 16,
    height: 50,
    borderColor: 'white',
    padding: 12,
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 20,
    },
    shadowOpacity: 1,
    shadowRadius: 5,

    elevation: 2,

  },

  dropDownItem: {
    //padding: 17,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    //backgroundColor: 'black', 
    color:'white'
  },
  textItem: {
    flex: 1,
    fontSize: 16,
    backgroundColor: 'black',
    color: 'white',
  },
  placeholderStyle: {
    fontSize: 16,

    //backgroundColor: 'black',
    color: 'white',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: 'white',
    fontStyle: 'bold',
    backgroundColor:'green'
  },
  inputSearchStyle: {
    //height: 60,
    fontSize: 16,
    //borderColor: 'white',
    //borderRadius: 2,
    backgroundColor: 'black',
    color: 'white',
    margin:0,
    marginBottom:0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'black', 
    color:'white',
    backgroundColor: '#222',
  },
  trainText: {
    color: 'white'
  },
  container: {
    flexDirection: 'column',
    flex: 1
    /*justifyContent: 'flex-start',
    alignItems: 'center'*/
  },
  map: {
    height: 700,
    flex: 1

  },



  locBtn: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: 'green',
    color: 'white',
    padding: 10,
    borderRadius: 10,
  },
  btnText:
  {
    color: 'white'
  },
  callout: {
    padding:16,
    height:'auto',
    backgroundColor:'black',

  }
});


