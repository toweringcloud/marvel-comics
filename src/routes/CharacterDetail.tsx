import { Box, HStack, Image, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";

import { characterDetail } from "../api";
import { CharacterDetailResponse, CharacterDetailResult } from "../types";
import Loading from "../components/Loading";

export default function CharacterDetail() {
	const { characterId } = useParams();
	// console.log("characterId : " + characterId);

	const { isLoading, data } = useQuery<CharacterDetailResponse>({
		queryKey: ["characters", characterId],
		queryFn: characterDetail,
	});
	// console.log(`CharacterDetail: ${JSON.stringify(data)}`);
	const detail: CharacterDetailResult = data?.data.results[0]!;

	return (
		<VStack>
			<Text color={"red.500"} fontSize={"4xl"} mt={10} noOfLines={1}>
				<Link to="/">Marvel Characters ({characterId})</Link>
			</Text>
			<HStack gap={5}>
				{isLoading ? (
					<Loading />
				) : (
					<>
						<Box mt={10} ml={5}>
							<Image
								minH="200"
								maxH="800"
								src={`${detail.thumbnail.path}.${detail.thumbnail.extension}`}
							/>
						</Box>
						<Box mr={5} w={"60vw"}>
							<Text
								fontSize={"2xl"}
								fontWeight={700}
								mb={5}
								noOfLines={1}
							>
								{detail.name}
							</Text>
						</Box>
					</>
				)}
			</HStack>
		</VStack>
	);
}
