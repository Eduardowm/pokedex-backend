import { PrismaClient } from "@prisma/client";
import PokemonModel from "../models/PokemonModel";
import { IPokemonStorage } from "./IPokemonStorage";
import { POKEMONS_BY_PAGE } from "../../constants";

class PokemonPrismaStorage implements IPokemonStorage {
    constructor(
        private readonly client: PrismaClient,
    ) {}

    async all(): Promise<PokemonModel[]> {
        const pokemons = await this.client.pokemon.findMany({
            orderBy: { id: "asc" },
        });

        return pokemons.map((p) => PokemonModel.fromPrismaPokemon(p));
    }

    async getPage(page: number): Promise<PokemonModel[]> {
        const pokemons = await this.client.pokemon.findMany({
            skip: page ? (page - 1) * POKEMONS_BY_PAGE : undefined,
            take: POKEMONS_BY_PAGE,
            where: {
                id: {
                    gte: (page - 1) * POKEMONS_BY_PAGE,
                    lte: page * POKEMONS_BY_PAGE,
                },
            },
            orderBy: { id: "asc" },
        });

        return pokemons.map((p) => PokemonModel.fromPrismaPokemon(p));
    }

    async find(id: number): Promise<PokemonModel | null> {
        const pokemon = await this.client.pokemon.findFirst({ where: { id } });

        return pokemon ? PokemonModel.fromPrismaPokemon(pokemon) : null;
    }

    async createMany(pokemons: PokemonModel[]): Promise<PokemonModel[]> {
        const newPokemons = await this.client.pokemon.createManyAndReturn({
            data: pokemons.map((pokemon) => pokemon.toPrismaPayload()),
        });

        return newPokemons.map((p) => PokemonModel.fromPrismaPokemon(p));
    }

    async create(pokemon: PokemonModel): Promise<PokemonModel> {
        const createdPokemon = await this.client.pokemon.create({
            data: pokemon.toPrismaPayload(),
        });

        return PokemonModel.fromPrismaPokemon(createdPokemon);
    }

    async upsert(pokemon: PokemonModel): Promise<PokemonModel> {
        const upsertedPokemon = await this.client.pokemon.upsert({
            where: { id: pokemon.id },
            create: pokemon.toPrismaPayload(),
            update: pokemon.toPrismaPayload(),
        });

        return PokemonModel.fromPrismaPokemon(upsertedPokemon);
    }

    async update(id: number, data: Omit<PokemonModel, 'id'>): Promise<PokemonModel> {
        const updatedPokemon = await this.client.pokemon.update({
            where: { id },
            data: {
                name: data.name,
                image: data.image,
                order: data.order,
                weight: data.weight,
            },
        });

        return PokemonModel.fromPrismaPokemon(updatedPokemon);
    }

    async delete(id: number): Promise<void> {
        await this.client.pokemon.delete({ where: { id } });
    }
}
export default PokemonPrismaStorage
