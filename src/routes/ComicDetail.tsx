import { Box, Grid, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { useQuery, QueryKey } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

import { comicDetail, listComicCharacters } from "../api";
import {
	ComicDetailResponse,
	ComicDetailResult,
	CharactersResponse,
	CharactersResult,
} from "../types";
import Loading from "../components/Loading";
import Character from "../components/Character";

export default function ComicDetail() {
	const { comicId } = useParams();
	console.log("comicId : " + comicId);

	const { isLoading: loadingDetail, data: dataDetail } =
		useQuery<ComicDetailResponse>({
			queryKey: ["comics", comicId],
			queryFn: () => comicDetail({ queryKey: comicId }),
		});
	console.log(`ComicDetail: ${JSON.stringify(dataDetail)}`);
	const detail: ComicDetailResult = dataDetail?.data.results[0]!;

	const { isLoading: loadingCharacters, data: dataCharacters } =
		useQuery<CharactersResponse>({
			queryKey: ["characters", comicId],
			queryFn: () => listComicCharacters({ queryKey: comicId }),
		});
	console.log(dataCharacters);

	return (
		<VStack>
			<Text color={"red.500"} fontSize={"4xl"} mt={10} noOfLines={1}>
				<Link to="/">Marvel Comics ({comicId})</Link>
			</Text>
			<HStack gap={5}>
				{loadingDetail ? (
					<Loading />
				) : (
					<>
						<Box mt={10} ml={5}>
							<Link to={`/comics/${comicId}/characters`}>
								<Image
									minH="200"
									maxH="800"
									src={`${detail.thumbnail.path}.${detail.thumbnail.extension}`}
								/>
							</Link>
						</Box>
						<Box mr={5} w={"60vw"}>
							<Text
								fontSize={"2xl"}
								fontWeight={700}
								mb={5}
								noOfLines={1}
							>
								{detail.title}
							</Text>
							<Text fontSize={"xl"} fontWeight={500} mb={5}>
								PUBLISHED: {detail.dates[0].date.split("T")[0]}
							</Text>
							<Text>{detail.textObjects[0].text}</Text>
						</Box>
					</>
				)}
			</HStack>
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
				{loadingCharacters ? (
					<Loading />
				) : (
					dataCharacters?.data.results.map(
						(character: CharactersResult) => (
							<Character key={character.id} {...character} />
						)
					)
				)}
			</Grid>
		</VStack>
	);
}
