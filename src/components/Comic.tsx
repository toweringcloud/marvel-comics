import { Link } from "react-router-dom";
import { Box, Image, Text, VStack } from "@chakra-ui/react";

import { ComicsResult } from "../types";

export default function Comic({ id, thumbnail, title }: ComicsResult) {
	return (
		<>
			<Link to={`/comics/${id}`}>
				<VStack alignItems={"flex-start"}>
					<Box>
						<Image
							minH="200"
							src={`${thumbnail.path}.${thumbnail.extension}`}
						/>
					</Box>
					<Box>
						<Text>{title}</Text>
					</Box>
				</VStack>
			</Link>
		</>
	);
}
