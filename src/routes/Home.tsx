import { Grid, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";

import { listComics } from "../api";
import { ComicsResponse, ComicsResult } from "../types";
import Loading from "../components/Loading";
import Comic from "../components/Comic";

export default function Home() {
	const { isLoading, data } = useQuery<ComicsResponse>({
		queryKey: ["comics"],
		queryFn: listComics,
	});

	if (data) {
		console.log(data);
	}

	return (
		<VStack>
			<Text color={"red.500"} fontSize={"4xl"} mt={10}>
				Marvel Comics Explorer
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
				{isLoading ? <Loading /> : null}
				{data?.data.results.map((comic: ComicsResult) =>
					comic.thumbnail.path !== "image_not_available" ? (
						<Comic key={comic.id} {...comic} />
					) : null
				)}
			</Grid>
		</VStack>
	);
}
