import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import styles from '../views/styles'

const TrainData = ({ item }) => {
    return (
    <View style={styles.trainItem}>
        <Text style={styles.trainText}>{item.trainType} {item.trainNumber}</Text>
        {item.timetable.map((time, index) => (
            <View key={index} style={styles.trainDataRow}>
                <Text style={styles.trainText}>{time.type}</Text>
                <Text style={styles.trainText}>Raide: {time.commercialTrack}</Text>
                <Text style={styles.trainText}>Aikataulu: {time.scheduledTime}. {time.status}</Text>

            </View>
        ))}
    </View>
    )

};



export default TrainData;

