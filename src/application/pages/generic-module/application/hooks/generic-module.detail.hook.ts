import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MessageHandlerService } from 'src/infrastructure'
import { GenericModuleModel, genericModuleService } from '../../infrastructure'

export const useGenericModuleDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [genericModule, setGenericModule] = useState<GenericModuleModel | null>(
    null
  )
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchGenericModule = async () => {
      if (!id) {
        setError('Invalid genericModule ID')
        return
      }

      try {
        setLoading(true)
        const fetchedGenericModule = await genericModuleService.get(id)
        if (fetchedGenericModule) {
          setGenericModule(fetchedGenericModule)
        } else {
          setError('GenericModule not found')
        }
      } catch (error) {
        MessageHandlerService.error({
          error,
          defaultMessage: 'Error fetching genericModule',
        })
      } finally {
        setLoading(false)
      }
    }

    fetchGenericModule()
  }, [id])

  return { id, genericModule, loading, error, setLoading }
}
