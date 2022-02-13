import React, { Fragment, useState } from "react";
import axios from "axios";
import Textfield from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const options = [
	"Pikachu",
	
	"Charmander",
	"Bulbasaur",
	"Venusaur",
	"Charmeleon",
	"Charizard",
	"Squirtle",
	"Wartortle",
	"Blastoise",
	"Caterpie",
	"Metapod",
	"Butterfree",
	"Weedle",
	"Kakuna",
	"Beedrill",
	"Pidgey",
	"Pidgeotto",
	"Pidgeot",
	"Rattata",
	"Raticate",
];

function PokemonSearch() {
	const [name, setName] = useState("");
	const [details, setDetails] = useState("");

	const getCharacter = () => {
		if (name !== "") {
			const character = name.toLowerCase();
			axios
				.get(`https://pokeapi.co/api/v2/pokemon/${character}`)
				.then((res) => res.data)
				.then((res) => setDetails(res))
				.catch((err) => console.log(err));
		}
	};
  
  
  const { name: names, height, weight, sprites, abilities } = details
  
  
    abilities && console.log(abilities[0].ability.name)
	return (
		<Fragment>
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					p: "2rem",
				}}
			>
				<Box sx={{ p: 1 }}>
					<Autocomplete
						inputValue={name}
						onInputChange={(e, value) => setName(value)}
						sx={{
							width: {
								xs: 150,
								sm: 250,
								md: 300,
							},
						}}
						renderInput={(props) => (
							<Textfield {...props} label="Search Character" />
						)}
						options={options}
					/>
				</Box>
				<Box sx={{ p: 1, pt: 2 }}>
					<Button onClick={getCharacter} variant="contained">
						Search
					</Button>
				</Box>
			</Box>
			<Container
				sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
			>
				<Box>
					{details && (
						<Card sx={{ width: 300, maxWidth: "300", mb: 3, boxShadow: 3 }}>
							<CardMedia
								component="img"
								alt="Pokemon character"
								height="25%%"
								src={sprites.front_default}
							/>
							<CardContent>
								<Typography gutterBottom variant="h5" component="div">
									{names.toUpperCase()}
								</Typography>
								<Box
									sx={{ p: 2, display: "flex", justifyContent: "flex-start" }}
								>
									<Box sx={{ p: 1 }}>
										<Typography variant="body2" color="text.primary">
											height:{height}
										</Typography>
										<Typography variant="body2" color="text.primary">
											weight:{weight}
										</Typography>
									</Box>
									<Box sx={{ pl: 1 }}>
                    <Typography  sx={{ fontSize: '18px' }}>Abilities:</Typography>
										{abilities &&
											abilities?.map((ability, i) => (
												<Typography
													variant="body2"
													color="text.primary"
													key={i}
												>
													{ability.ability.name}
												</Typography>
											))}
									</Box>
								</Box>
							</CardContent>
						</Card>
					)}
					{!details && (
						<Typography> Nothing to show here please select </Typography>
					)}
				</Box>
			</Container>
		</Fragment>
	);
}
export default PokemonSearch;
