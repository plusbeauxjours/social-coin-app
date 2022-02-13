import React, { useEffect } from "react";

import { useQuery } from "react-query";
import { StackNavigationProp } from "@react-navigation/stack";
import { ParamListBase, RouteProp } from "@react-navigation/native";
import styled from "styled-components/native";
import { VictoryChart, VictoryLine, VictoryScatter } from "victory-native";

import { history, info } from "../api";
import { Icon } from "../components/Coin";
import { BLACK_COLOR } from "../colors";
import { useState } from "react";

interface IProps {
  navigation?: StackNavigationProp<ParamListBase>;
  route?: RouteProp<{ params: { symbol?: string; id?: string } }, "params">;
}

const Container = styled.ScrollView`
  background-color: ${BLACK_COLOR};
`;

const Detail: React.FC<IProps> = ({
  navigation,
  route: {
    params: { symbol, id },
  },
}) => {
  const { isLoading: infoLoading, data: infoData } = useQuery(
    ["coinInfo", id],
    info
  );

  const { isLoading: historyLoading, data: historyData } = useQuery(
    ["coinHistory", id],
    history
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <Icon
          source={{
            uri: `https://cryptoicon-api.vercel.app/api/icon/${symbol.toLowerCase()}`,
          }}
        />
      ),
    });
  }, []);

  const [victoryData, setVictoryData] = useState(null);
  useEffect(() => {
    if (historyData) {
      setVictoryData(
        historyData.map((price) => ({
          x: new Date(price.timestamp).getTime(),
          y: price.price,
        }))
      );
    }
  }, [historyData]);
  return (
    <Container>
      {victoryData ? (
        <VictoryChart height={360}>
          <VictoryLine
            animate
            interpolation="monotoneX"
            data={victoryData}
            style={{ data: { stroke: "#1abc9c" } }}
          />
          <VictoryScatter
            data={victoryData}
            style={{ data: { fill: "#1abc9c" } }}
          />
        </VictoryChart>
      ) : null}
    </Container>
  );
};
export default Detail;
