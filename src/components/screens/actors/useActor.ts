import { useMemo } from "react"
import { useQuery } from "react-query"
import { useParams } from "react-router"
import { ActorService } from "../../../service/actor.service"
import { MyToast } from "../../ui/toast/MyToast"



export const useActor = () => {
  const params = useParams()
  const slug = params.slug ? params.slug : ''

  const {data, isLoading} = useQuery(['actor by slug', slug], () => 
  ActorService.getBySlug(slug), {
    onError: () => {
      MyToast('Error actor', false)
    }
  })

  return useMemo(() => ({
    isLoading,
    data
  }), [data, isLoading])
}