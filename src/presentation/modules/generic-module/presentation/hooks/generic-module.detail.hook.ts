import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { GenericModule, genericModuleRepository } from '../../core'

export const useGenericModuleDetail = () => {
  const { id } = useParams<{ id: string }>()
  const [genericModule, setGenericModule] = useState<GenericModule | null>(null)
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
        const fetchedGenericModule = await genericModuleRepository.getById(id)
        if (fetchedGenericModule) {
          setGenericModule(fetchedGenericModule)
        } else {
          setError('GenericModule not found')
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchGenericModule()
  }, [id])

  return { id, genericModule, loading, error, setLoading }
}
