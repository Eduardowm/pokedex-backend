import { AxiosInstance } from "axios";
import { IApiGateway } from "./IApiGateway";
import ApiPokemonModel from "../models/ApiPokemonModel";
import PokemonModel from "../models/PokemonModel";
import { POKEMONS_BY_PAGE } from "../../constants";

export interface PokeAPISinglePokemon {
  id: number,
  name: string,
  order: number,
  weight: number,
  sprites: {
    front_default: string,
  }
}

interface GetAllPokemonResponse {
  results: PokeAPISinglePokemon[]
}

class PokeApiGateway implements IApiGateway {
  private base_url = 'https://pokeapi.co/api/v2/';

  constructor(
    public readonly client: AxiosInstance,
  ) {}

  public async get(page = 1): Promise<PokemonModel[]> {
    const response = await this.client.get<GetAllPokemonResponse>(
      `${this.base_url}/pokemon?limit=${POKEMONS_BY_PAGE}&offset=${(page - 1) * POKEMONS_BY_PAGE}`
    );

    // Get details of each pokemon.
    const apiPokemonsWithDetails: ApiPokemonModel[] = await Promise.all(
      response.data.results.map(async (p: any) => {
        const pokemonDetails = await this.client.get(p.url)
        return ApiPokemonModel.fromJson(pokemonDetails.data)
      })
    );

    return apiPokemonsWithDetails.map((p) => PokemonModel.fromPokeAPI(p));
  }

  public async find(id: number): Promise<PokemonModel> {
    const response = await this.client.get<PokeAPISinglePokemon>(`${this.base_url}/pokemon/${id}`);
    const apiPokemon = ApiPokemonModel.fromJson(response.data)

    return PokemonModel.fromPokeAPI(apiPokemon);
  }
}
export default PokeApiGateway;
