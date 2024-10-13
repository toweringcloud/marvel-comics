import { Link } from "react-router-dom";
import { Box, Image, Text, VStack } from "@chakra-ui/react";

import { CharactersResult } from "../types";

export default function Character({
	id,
	thumbnail,
	name,
	description,
}: CharactersResult) {
	return (
		<Link to={`/characters/${id}`}>
			<VStack alignItems={"flex-start"}>
				<Box>
					<Image
						minH="200"
						src={`${thumbnail.path}.${thumbnail.extension}`}
					/>
				</Box>
				<Box>
					<Text fontSize={"2xl"} noOfLines={1}>
						{name}
					</Text>
					<Text noOfLines={[1, 2, 3]}>{description}</Text>
				</Box>
			</VStack>
		</Link>
	);
}
