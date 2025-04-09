import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

export default function Information({ title, imageSource, desc }) {
  return (
    <View style={{ margin: 10 }}>
      <View style={styles.card}>
        <Image style={styles.image} source={imageSource} />
      </View>
      <View style={styles.descTitle}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.textDesc}>{desc}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  descTitle: {
    alignItems: "center",
    paddingVertical: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
  },
  textDesc: {
    fontSize: 20,
  },
  card: {
    width: '100%',
    height: 400,
    borderRadius: 20,
    backgroundColor: '#000',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    marginVertical: 20,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
})