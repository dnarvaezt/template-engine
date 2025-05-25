import {
  ICreateGenericModuleUseCase,
  IDeleteGenericModuleUseCase,
  IGetGenericModuleUseCase,
  ISearchGenericModuleUseCase,
  IUpdateGenericModuleUseCase,
} from '../input'

export interface IGenericModuleRepository
  extends ICreateGenericModuleUseCase,
    IDeleteGenericModuleUseCase,
    IGetGenericModuleUseCase,
    ISearchGenericModuleUseCase,
    IUpdateGenericModuleUseCase {}
