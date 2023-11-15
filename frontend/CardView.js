import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const CardView = ({ data }) => {
  let separator = false;

  const getManagerName = (parentId) => {
    const manager = data.find((item) => item.id === parentId);
    return manager ? manager.name : "No Manager";
  };

  return (
    <ScrollView contentContainerStyle={styles.containerMain}>
      {data.map((item) => (
        <View
          key={item.id}
          style={[
            styles.card,
            {
              backgroundColor: item.backgroundColor
                ? item.backgroundColor
                : "#fff"
            },
          ]}
        >
          <Text style={[styles.title,{ color: item.backgroundColor === "black" ? "#fff" : "#000" }]}>{item.name}</Text>
          <Text style={[styles.heading,{ color: item.backgroundColor === "black" ? "#fff" : "#000" }]}>Email:</Text>
          <Text style={[styles.detail,{ color: item.backgroundColor === "black" ? "#fff" : "#000" }]}>{item.email}</Text>
          <Text style={[styles.heading,{ color: item.backgroundColor === "black" ? "#fff" : "#000" }]}>Address:</Text>
          <Text style={[styles.detail,{ color: item.backgroundColor === "black" ? "#fff" : "#000" }]}>{item.address}</Text>
          <Text style={[styles.heading,{ color: item.backgroundColor === "black" ? "#fff" : "#000" }]}>Phone:</Text>
          <Text style={[styles.detail,{ color: item.backgroundColor === "black" ? "#fff" : "#000" }]}>{item.phone}</Text>
          <Text style={[styles.heading,{ color: item.backgroundColor === "black" ? "#fff" : "#000" }]}>Manager:</Text>
          <Text style={[styles.detail,{ color: item.backgroundColor === "black" ? "#fff" : "#000" }]}>
            {item.parentId ? getManagerName(item.parentId) : "N/A"}
          </Text>

          {separator && <View style={styles.rowSeparator} />}
          {(separator = !separator)}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  containerMain: {
    marginTop: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    padding: 20,
    marginVertical: 10,
    borderRadius: 8,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.3,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  heading: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "justify",
    marginTop: 5,
  },
  detail: {
    fontSize: 14,
    marginBottom: 10,
    textAlign: "justify",
  },
  rowSeparator: {
    height: 10,
    width: "100%",
  },
});

export default CardView;
