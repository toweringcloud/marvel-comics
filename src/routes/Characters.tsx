import { Grid, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { listCharacters } from "../api";
import { CharactersResponse, CharactersResult } from "../types";
import Loading from "../components/Loading";
import Character from "../components/Character";

export default function Characters() {
	const { isLoading, data } = useQuery<CharactersResponse>({
		queryKey: ["characters"],
		queryFn: listCharacters,
	});

	return (
		<VStack>
			<Text color={"red.500"} fontSize={"4xl"} mt={10}>
				<Link to="/">Marvel Comics Explorer</Link>
			</Text>
			<Grid
				mt={10}
				px={{ base: 10, md: 15, lg: 20 }}
				columnGap={4}
				rowGap={8}
				templateColumns={{
					sm: "1fr",
					md: "repeat(2, 1fr)",
					lg: "repeat(3, 1fr)",
					xl: "repeat(4, 1fr)",
					"2xl": "repeat(5, 1fr)",
				}}
			>
				{isLoading ? (
					<Loading />
				) : (
					data?.data.results.map((character: CharactersResult) => (
						<Character key={character.id} {...character} />
					))
				)}
			</Grid>
		</VStack>
	);
}
