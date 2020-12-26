class PokemonsController < ApplicationController

    def index 
        pokemons = Pokemon.all
        render json: pokemons
    end

    def show 
        pokemon = Pokemon.find(params[:id])
        render json: pokemon, status: 200
    end

    def create 
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        trainer_id = params[:trainer_id]
        pokemon = Pokemon.create(nickname: name, species: species, trainer_id: trainer_id)
        render json: pokemon, status: 200
    end

    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
        render json: pokemon, status: 200
    end
    private 

    def pokemon_params 
        pokemon.permit(:species, :nickname, :trainer_id)
    end
end
