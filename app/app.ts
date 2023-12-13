

import { App } from "../cls/app"
import { Perfil } from "../cls/perfil"
import { Postagem } from "../cls/postagem"
import {RedeSocial} from "../cls/redeSocial"
import {RepositorioDePerfis} from "../cls/repositorioPerfis"
import {RepositorioDePostagens} from "../cls/repositorioPostagens"

function main() {
    const profiles: Perfil[] = []
    const posts: Postagem[] = []
    const repProfiles: RepositorioDePerfis = new RepositorioDePerfis(profiles)
    const repPosts: RepositorioDePostagens = new RepositorioDePostagens(posts)
    const socialMedia: RedeSocial = new RedeSocial(repProfiles, repPosts)
    const app = new App(socialMedia, true)
}

main()
